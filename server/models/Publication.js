import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    datepublication: {
      type: Date,
      default: Date.now,
    },
    contenu: {
      type: String,
    },
},
  {
    toJSON: { virtuals: true }, // Enable virtuals to be included when converting to JSON
  }
);

// Define the virtual 'fullName' using the 'get' function
PublicationSchema.virtual('resume').get(function () {
  return this.contenu.slice(0,5)
});
const Publication = mongoose.model("Publication", PublicationSchema);
export default Publication;
