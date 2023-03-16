import mongoose from 'mongoose';


interface GoogleUserAttrs {
  googleId: string,
  displayName: string,
  firstName: string,
  lastName: string,
  email: string,
  verified: boolean,
  photoURL: string,
}

interface GoogleUserDoc extends mongoose.Document {
  googleId: string,
  displayName: string,
  firstName: string,
  lastName: string,
  email: string,
  verified: boolean,
  photoURL: string,
}

interface GoogleUserModel extends mongoose.Model<GoogleUserDoc> {
  build(attrs: GoogleUserAttrs) : GoogleUserDoc;
}

const googleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
});
// Middleware functions are functions that are executed before or after a database operation is performed on a document, such as save, update, validate, and others.
googleUserSchema.pre('save', async function (done) {
  if(this.isModified('googleId')){
    console.log('googleId is Modified');
  }
  done();
})

googleUserSchema.statics.build = (attrs: GoogleUserAttrs) => {
  return new GoogleUser(attrs);
};

const GoogleUser = mongoose.model<GoogleUserDoc,GoogleUserModel>('GoogleUser', googleUserSchema);

export { GoogleUser }
