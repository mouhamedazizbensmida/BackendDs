import mongoose from "mongoose";


const PublicationSchema =new  mongoose.Schema(
        {  
            title: {
              type: String,
            },
            datepublication: {
                type: Date, default: Date.now 
            },
            contenu: {
              type: String,
            }, 

           },	
);
// Create a virtual property named 'resume'
PublicationSchema.virtual('resume').get(function () {
    if (this.contenu) {
      return this.contenu.slice(10);
    }
    return '';
  });

  
const Publication = mongoose.model("Publication", PublicationSchema)
export default Publication;