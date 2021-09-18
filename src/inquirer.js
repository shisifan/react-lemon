const inquirer = require('inquirer');
const promptList = [
    {
        name:'conf',
        type:'confirm',
        message:'是否创建新的项目？'
    },{
        name:'name',
        message:'请输入项目名称？',
        when: res => Boolean(res.conf)
    },{
        name:'author',
        message:'请输入作者？',
        when: res => Boolean(res.conf)
    },{
        type: 'list',
        message: '请选择模版？',
        name: 'lemon',
        choices: ['react + ts', "react", "vue", "vue + ts"],
        filter: function(val) {
          return val.toLowerCase()
        },
        when: res => Boolean(res.conf)
    }
];
function create (){
    return new Promise((resolve)=>{
        inquirer.prompt(promptList).then(res=>{
            resolve(res)
            // console.log(res);
        })
    })
}
module.exports = {create}