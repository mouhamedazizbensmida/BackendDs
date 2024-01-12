
import bcrypt from "bcrypt"
import User from "../models/User.js"

// http://localhost:5001/Admin/add-admin
// {
//   "nom":"aziz",
//   "prenom":"Ben smida",
//   "telephone":"20834585",
//   "login":"aziz",
//   "password":"password"
 
// }
export const AddAdmin = async (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                ...req.body,
                statut:"V",
                role:"admin",
                password: hash,
            })
            user
                .save()
                .then((response) => {
                    const newUser = response.toObject()
                    delete newUser.password
                    res.status(201).json({
                        user: newUser,
                        message: "Admin crée !"
                    })
                })
                .catch((error) => res.status(400).json({error:error.message}))
        })
        .catch((error) => res.status(500).json({error}))
}
// http://localhost:5001/Admin/ValidateAuthor
// {
//   "id":"65a186b584d0c7a86fba2cec"(t7ot id author)
// }
export const ValidateAuthor = async (req, res) => {
  try {
    const author = await User.findOne({ _id: req.body.id });

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const hashedPassword = await bcrypt.hash(author.telephone, 10);

    const newPassword = {
      password: hashedPassword,
      statut:'V'
    };

    const updatedAuthor = await User.findOneAndUpdate(
      { _id: req.body.id },
      newPassword,
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(500).json({ error: 'Failed to update author' });
    }

    res.status(200).json({ message: 'Author password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

