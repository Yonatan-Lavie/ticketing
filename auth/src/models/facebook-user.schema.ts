import mongoose from 'mongoose';


interface FacebookUserAttrs  {
  facebookId: string,
  displayName: string
}

interface FacebookUserDoc extends mongoose.Document {
  facebookId: string,
  displayName: string
}


interface FacebookUserModel extends mongoose.Model<FacebookUserDoc> {
  build(attrs: FacebookUserAttrs) : FacebookUserDoc;
}
const facebookUserSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
  },
}, 
{  
      toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    });

// Middleware functions are functions that are executed before or after a database operation is performed on a document, such as save, update, validate, and others.
facebookUserSchema.pre('save', async function (done) {
  if(this.isModified('facebookId')){
    console.log('facebookId is Modified');
  }
  done();
})

facebookUserSchema.statics.build = (attrs: FacebookUserAttrs) => {
  return new FacebookUser(attrs);
};

const FacebookUser = mongoose.model<FacebookUserDoc,FacebookUserModel>('FacebookUser', facebookUserSchema);

export { FacebookUser }
