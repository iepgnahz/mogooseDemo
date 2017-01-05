import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/demo');

const eventSchema =new mongoose.Schema({
  createTime:{
    type:Number,
    default: new Date().getTime() //getTime() 返回从 1970 年 1 月 1 日至今的毫秒数。
  }
});
const Event = mongoose.model('event',eventSchema);  //创建了一个父类的Event  Model

const ClickEvent = Event.discriminator('clickEvent',new mongoose.Schema({
  url: String
})); //创建了点击事件的Model

const MouseMoveEvent = Event.discriminator('mouseMoveEvent', new mongoose.Schema({
  x: Number,
  y: Number
})); //创建了鼠标移动事件的Model

let c = new ClickEvent({
  url: 'baidu'
});  //创建了ClickEvent的一个记录

let m = new MouseMoveEvent({
  x: 30,
  y: 20
});  //创建了MouseMoveEvent的一个记录

c.save((err,doc)=>{
  if (!err && doc) {
    console.log('clickEvent存储成功',doc);

  }
});

m.save((err,doc)=>{
  if (!err && doc) {
    console.log('mouseMoveEvent存储成功',doc);
    Event.find({},(err,docs)=>{
      console.log('使用父Model查找',docs)
    })

    ClickEvent.find({},(err,docs)=>{
      console.log('使用子ModelClick Model 查找',docs)
    })

    MouseMoveEvent.find({},(err,docs)=>{
      console.log('MouseMoveEvent Model 查找',docs)
    })

  }
});

let e = new Event({
  url: 'abc'
})

e.save((err,doc)=>{
  if (!err && doc) {
    console.log('Event存储成功++++',doc);
  }
});





