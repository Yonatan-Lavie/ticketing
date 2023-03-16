import mongoose from 'mongoose';
import { Password } from '../services/password';



interface LocalUserAttrs {
  email: string,
  password: string,
}

interface LocalUserDoc extends mongoose.Document {
  email: string,
  password: string,
}

interface LocalUserModel extends mongoose.Model<LocalUserDoc> {
  build(attrs: LocalUserAttrs) : LocalUserDoc;
}

const localUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
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


localUserSchema.pre('save', async function (done) {
  if(this.isModified('password')){
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
  }
  done();
})

localUserSchema.statics.build = (attrs: LocalUserAttrs) => {
  return new LocalUser(attrs);
};



const LocalUser = mongoose.model<LocalUserDoc,LocalUserModel>('LocalUser', localUserSchema);

export { LocalUser }