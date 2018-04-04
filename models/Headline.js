const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new HeadlineSchema object
// This is similar to a Sequelize model
const HeadlineSchema = new Schema({
    // `title` is required and of type String
    //unique: true ensures that we don't have duplicate articles in the database.
    title: {
        type: String,
        required: true,
        unique: true
    },
    // `link` is required and of type String
    link: {
        type: String,
        required: true
    },
    // `summary` is required and of type String
    summary: {
        type: String,
        required: true
    },
    // `img` is required and of type String
    img: {
        type: String,
        required: true
    },
    //'saved' is required, of type Boolean, and has a default value of false.
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Headline with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// This creates our model from the above schema, using mongoose's model method
const Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Article model
module.exports = Headline;

