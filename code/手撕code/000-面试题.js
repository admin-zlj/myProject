/** 
请输出下列结果
**/
1 + "23"; //123
1 + false; //1
1 + Symbol(); //报错
"1" + false; //1false
false + true; //1

/** 
请输出下列的值
**/
var id = "GLOBAL";
var obj = {
	id: "OBJ",
	a: function () {
		console.log(this.id);
	},
	b: () => {
		console.log(this.id);
	},
};
obj.a(); //OBj
obj.b(); //GLOBAL
new obj.a();   // undefined
new obj.b(); //报错
