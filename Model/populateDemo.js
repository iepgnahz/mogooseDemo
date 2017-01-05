import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/demo');
import async from 'async';
const personSchema = new mongoose.Schema({
  _id     : Number,  //主键就算不写也会自动生成
  name    : String,
  age     : Number,
  stories : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
});
//我们可以看到。stories字段是一个数组，每一个值是document._id,填充的时候这个
//字段应该使用story中的记录填充

const storySchema = mongoose.Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

const Story  = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

const p1 = new Person({
  _id:0,
  name: '张培',
  age:20
});

const s1 = new Story({
  _creator:p1._id,
  title:'百科全书',
  fans: p1._id
});

function save(doc,callback) {
  doc.save((err,doc)=>{
    callback(err,doc)
  })
};

async.map([s1,p1],save,(err,result)=>{
  console.log('循环插入的结果',result);
  Story.find({})
    .populate('_creator','age')
    .exec((err,doc)=>{
    console.log('填充后的doc',doc)
  });
});

