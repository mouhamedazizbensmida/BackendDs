
import User from "../models/User.js"

import Publication from "../models/Publication.js"

// http://localhost:5001/Author/register
// {
//   "nom":"ghassen",
//   "prenom":"hedhli",
//   "telephone":"21126748",
//   "login":"ghassen"
// }
export const AddAuthor = async (req, res) => {
    try { 
        const Author = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            telephone: req.body.telephone,
            login: req.body.login,
        })
         const newAuthor = await User.create(Author);
         
         res.status(201).json({Author:newAuthor, message: "Author added with success" });
       }
  catch (e) {
     res.status(400).json({
         e:e.message,
         message:"Author Not Added"
     })
 }
 };

//  http://localhost:5001/Author/Addpublication
//  Token
//  {"title": "ya nina",         
// "contenu":"sayeb sale7"}
export const Addpublication = async(req, res) => {
        try {
          const id_user = req.auth.userId;
      console.log(id_user)
          // Create a new Publication instance
          const newPublication = await Publication.create(req.body);

  // Assuming you have a publications field in the User schema to store Publication IDs
  const user = await User.findByIdAndUpdate(
    id_user,
    { $push: { ref: newPublication._id } },
    { new: true }
  );
      
          // Respond with the new Publication and its ID
          res.status(201).json({ Publication: user, message: 'Publication added with success' });
        } catch (e) {
          res.status(400).json({
            error: e.message,
            message: 'Publication Not Added',
          });
        }
      };

/*Find All publications*/ 
// http://localhost:5001/Author/FindAllpublications
// Token
export const FindAllpublications = async (req, res) => {

     
        try {
            const id_user = req.auth.userId; 
            const publications = await User.findOne({ _id: id_user }).select('-_id -__v -nom -password')
              .populate({
                path: 'ref',
                select: '-_id -__v',
              })
              .exec();    
      if (!publications || publications.length === 0) {
        return res.status(404).json({ message: "publications Not Found" });
      }
  
      res.status(200).json({
        publications: publications,
        message: "publications Founded!!",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "We can't fetch publications",
      });
    }
    }
/*Find All publications*/ 
// http://localhost:5001/Author/Findonepublication
// Token
// {"id_pub":"65a197ca86312fe86b22e0f0"}
export const Findonepublication = async (req, res) => {
   
        try { 
            const id_user = req.auth.userId; 
            const id_pub=req.body.id_pub
            console.log(id_user)
            console.log(id_pub)
            const isIdInRefs = await User.findOne({ _id: id_user, ref: { $in: [id_pub] } });

            if (!isIdInRefs) {
              return res.status(404).json({ error: 'Publication not found in user references' });
            }

            const publications = await Publication.find({_id: id_pub }).select(' -__v ')  
                
       
      if (!publications || publications.length === 0) {
        return res.status(404).json({ message: "publications Not Found" });
      }
  
      res.status(200).json({
        publications: publications,
        message: "publications Founded!!",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "We can't fetch publications",
      });
    }
  };
