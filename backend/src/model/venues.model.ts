import mongoose from "mongoose";

// Sub-schema for courts available at a venue
const courtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // courtName
    sportPlayed: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: true }
);

// Main schema for a venue
const venueSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    venueId: { type: String, required: true, unique: true },

    img: { type: [String], required: true, default: [] },

    name: { type: String, required: true }, // name of venue
    about: { type: String, required: true }, // about venue
    location: { type: String, required: true },

    sports: { type: [String], required: true, default: [] },

    courts: { type: [courtSchema], required: true, default: [] },

    totalNoOfCourts: { type: Number, required: true },

    openTime: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: (props: any) => `${props.value} is not a valid HH:mm time`,
      },
    },
    closeTime: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: (props: any) => `${props.value} is not a valid HH:mm time`,
      },
    },
  },
  { timestamps: true }
);

// Helpful derived virtual for number of courts if consumer prefers not to store totalNoOfCourts
venueSchema.virtual("numberOfCourts").get(function (this: any) {
  return Array.isArray(this.courts) ? this.courts.length : 0;
});

const Venue = mongoose.model("Venue", venueSchema);
export default Venue;