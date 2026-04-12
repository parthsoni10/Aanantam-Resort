const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodoverride = require("method-override");
const ejs_mate = require("ejs-mate");
const booking = require("./models/bookingschema.js");
const expresserror = require("./public/utils/expresserror.js");
const wrapAsync = require("./public/utils/wrapasync.js");
const signupschema = require("./models/signupschema.js");
const passport = require("passport");
const passport_local = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const crypto = require("crypto");
const razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/payment");
const bookingHistoryRoutes = require("./routes/bookingHistory");
const BookingHistory = require("./models/BookingHistory.js");
const Payment = require("./models/payment.js");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

const sessionOptions = {
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,  // Set to true in production (HTTPS required)
        maxAge: 24 * 60 * 60 * 1000 // **1 day (24 hours)**
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passport_local(signupschema.authenticate()));

passport.serializeUser(signupschema.serializeUser());
passport.deserializeUser(signupschema.deserializeUser());

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.current = req.user;
    next();
});

app.use((req, res, next) => {
    if (req.session.cookie.expires && req.session.cookie.expires < new Date()) {
        req.logout(() => { });  // Logout user when session expires
        req.flash("error", "Your session has expired. Please log in again.");
        return res.redirect("/login");
    }
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejs_mate);

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

// Routes
app.use("/api/payment", paymentRoutes);
app.use(bookingHistoryRoutes); // Add Booking History Routes

async function main() { await mongoose.connect("mongodb://127.0.0.1:27017/test"); }
app.listen(8080, () => { console.log("listening on port 8080"); });

let totalVisitors = 0;
app.use((req, res, next) => {
    if (!req.session.visited) {
        req.session.visited = true;
        totalVisitors++; // Increase count for new visitors
    }
    next();
});

app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user; // Store user in req.user
    }
    next();
});

//login post route
app.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",   // Redirect on failure
    failureFlash: true, // Show error message
}), async (req, res) => {
    let username = req.user.username;
    if (username.endsWith("@admin")) {
        req.flash("success", `Welcome Admin! ${req.user.firstname} ${req.user.lastname}`);
        res.redirect("/admin"); // Redirect to admin panel
    } else {
        req.flash("success", `Welcome Back! ${req.user.firstname} ${req.user.lastname}`);
        res.redirect("/home"); // Redirect to user home page
    }
});

// All routes ::
app.get("/", (req, res) => { res.send("working"); });
app.get("/home", (req, res) => { res.render("annatamresort.ejs") });
app.get("/stay/room", (req, res) => { res.render("stay2_rooms.ejs") });
app.get("/stay/chalet", (req, res) => { res.render("stay2_chalet.ejs"); });
app.get("/stay/suites", (req, res) => { res.render("stay2_suites.ejs"); })
app.get("/wellness/allphotos", (req, res) => { res.render("allphotosgallary.ejs"); });
app.get("/wellness/rooms", (req, res) => { res.render("wellnessroom.ejs"); });
app.get("/wellness/dining", (req, res) => { res.render("wellnessdining.ejs"); });
app.get("/wellness/wellness", (req, res) => { res.render("wellness.ejs"); });
app.get("/wellness/wedding&events", (req, res) => { res.render("wellness.ejs"); });
app.get("/wellness/activities", (req, res) => { res.render("wellness.ejs"); });
app.get("/wedding&events_wedding", (req, res) => { res.render("Wedding& Events6_wedding.ejs"); });
app.get("/wedding&events_corporate", (req, res) => { res.render("Wedding& Events6_corporate.ejs"); });
app.get("/dining_cafeteria", (req, res) => { res.render("dining5_cafeteria.ejs"); });
app.get("/dining/gamezone", (req, res) => { res.render("dining5_gamezone.ejs"); });
app.get("/dining/restaurant", (req, res) => { res.render("dining5_restaurant.ejs"); });
app.get("/packages/picnic", (req, res) => { res.render("picnicpackage.ejs"); });
app.get("/packages/honeymoon", (req, res) => { res.render("honeymoonpackage.ejs"); });
app.get("/signup", (req, res) => { res.render("signuppage.ejs"); });
app.get("/login", (req, res) => { res.render("loginpage.ejs"); });
app.get("/admin/adduser", (req, res) => { res.render("adduser_admin.ejs"); });
app.get("/admin/addroom", (req, res) => { res.render("addroom_admin.ejs"); });
app.get("/admin/addpayment", (req, res) => { res.render("addpayment_admin.ejs"); });
app.get("/admin/room", async (req, res) => { const list = await booking.find({}); res.render("room_admin.ejs", { list }); });
app.get("/admin/payment/add", async (req, res) => { res.render("addpayment_admin.ejs"); });

//booking-page route
app.get("/bookingpage", async (req, res) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        req.flash("error", "You Must Be Login");
        return res.redirect("/home");
    }
    const list = await booking.find();
    res.render("bookingpage.ejs", { list });
    // console.log(list);
});

//post request for signup page 
app.post("/signup", async (req, res) => {
    try {
        let { firstname, lastname, username, email, phone, password, address, state, } = req.body;
        const newuser = new signupschema({ firstname, lastname, username, email, phone, address, state });
        const registeruser = await signupschema.register(newuser, password);
        req.flash("success", "Successfully Signup");
        res.redirect("/login");
        console.log(newuser);
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});

// admin user route
app.get("/admin/user", async (req, res) => {
    const userlist = await signupschema.find({});
    console.log(userlist);
    res.render("user_admin.ejs", { userlist });
});

// admin payment route
app.get("/admin/payment", async (req, res) => {
    const paymentlist = await Payment.find({}).populate("user").populate("booking");;
    console.log(paymentlist);
    res.render("payment_admin.ejs", { paymentlist });
});

//admin payment delete route
app.delete('/admin/payment', async (req, res) => {
    try {
        await Payment.findByIdAndDelete(req.body.id);
        res.redirect('/admin/payment');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user");
    }
});

//admin user delete route
app.delete('/admin/user', async (req, res) => {
    try {
        await signupschema.findByIdAndDelete(req.body.id);
        res.redirect('/admin/user');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user");
    }
});

//add user post request route
app.post("/admin/adduser", async (req, res) => {
    let { username, firstname, lastname, email, phone, password, address, state, } = req.body;
    const newuser = new signupschema({ username, firstname, lastname, email, phone, address, state });
    const registeruser = await signupschema.register(newuser, password);
    console.log(registeruser);
    req.flash("success", "Successfully Added User");
    res.redirect("/admin/user");
});

app.delete('/admin/user', async (req, res) => {
    try {
        await booking.findByIdAndDelete(req.body.id);
        res.redirect('/admin/room');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting room");
    }
});

app.get("/profile", (req, res) => {
    res.render("profilepage.ejs");
});

app.get("/admin", (req, res) => {
    if (!req.isAuthenticated() || !req.user.username.endsWith("@admin")) {
        req.flash("error", "Unauthorized Access!");
        return res.redirect("/home");
    }
    res.render("adminpanel.ejs", { totalVisitors }); // Render admin panel page
});

app.get("/admin/edit/:id", async (req, res) => {
    const { id } = req.params;
    const userlist = await signupschema.findById(id);
    console.log(userlist);
    res.render("edit_admin.ejs", { userlist });
});

// Route to display booking details
app.get("/show-all-bookings", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Unauthorized: Please log in");
        }

        const userId = req.user._id; // Get the logged-in user Id
        const payments = await Payment.find({ user: userId })
            .populate("user")
            .populate("booking");

        if (!payments || payments.length === 0) {
            return res.status(404).send("No Bookings Found for This User");
        }

        res.render("showbooking2.ejs", { payments }); // Render new EJS file
    } catch (error) {
        console.error("❌ Error fetching payment details:", error);
        res.status(500).send("Internal Server Error");
    }
});

// logout route 
app.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/home");
    });
});

app.get("/showbooking/:paymentId", async (req, res) => {
    try {
        // Validate and convert paymentId to ObjectId
        const paymentId = req.params.paymentId;
        if (!paymentId) {  // Just check if paymentId exists
            req.flash("error", "Invalid Payment ID");
            return res.redirect("/home");
        }

        const payment = await Payment.findOne({ paymentId })
            .populate("user")
            .populate("booking");

        if (!payment) {
            req.flash("error", "Payment record not found");
            return res.redirect("/home");
        }

        res.render("showbooking.ejs", { payment });
    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).send("Error fetching booking details");
    }
});

//update data  for user
app.put("/admin/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, firstname, lastname, phone, email, address, state } = req.body;

        let update = await signupschema.findByIdAndUpdate(
            id,
            { username, firstname, lastname, phone, email, address, state },
            { runValidators: true, new: true } // Ensure it returns updated data
        );

        if (!update) {
            return res.status(404).send("User not found");
        }

        console.log("Updated User:", update);
        res.redirect("/admin/user");
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).send("Internal Server Error");
    }
});

//update data  for user
app.put("/admin/paymentedit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, firstname, lastname, phone, email, address, state } = req.body;

        let update = await signupschema.Payment(
            id,
            { username, firstname, lastname, phone, email, address, state },
            { runValidators: true, new: true } // Ensure it returns updated data
        );

        if (!update) {
            return res.status(404).send("User not found");
        }

        console.log("Updated User:", update);
        res.redirect("/admin/payment");
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/bookingdata/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await booking.findById(id);

    let selectedRooms = req.query.selectedRooms;
    let totalPrice = req.query.totalPrice;
    let room_no = req.query.room_no;

    // Render booking page with updated values
    res.render('bookingdata.ejs', { rooms: selectedRooms, price: totalPrice, list, room_no: selectedRooms });
}));

app.all("*", (req, res, next) => {
    next(new expresserror("Page not fo  und!", 404));
});

app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs", { message });
});

