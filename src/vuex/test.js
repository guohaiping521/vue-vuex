let a = {

    name: 'Julia',
  
    age: 20
  
  }
  
  function change(o) {
  
    o.age = 24;
    o.name = 'Kath';
    o = {
      name: 'o update',
  
      age: 30
  
    }
  
    return o;
  
  }
  
  let b = change(a);     // 注意这里没有new，后面new相关会有专门文章讲解
  
  console.log(b);    // 第一个console
  
  console.log(a);    // 第二个console
  