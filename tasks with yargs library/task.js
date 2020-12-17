// const chalk = require('chalk');


 
// console.log(chalk.blue('Hello world!'));
// console.log(chalk.blue('Hello') + ' World' + chalk.red('!'))
// console.log(chalk.green('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'))
// console.log(chalk.rgb(123, 45, 254).underline('Underlined reddish color'))


// console.log(process.argv)
// const op = process.argv[2]

// switch(op){
//     case('add'):{console.log('Add Task'); break;};
//     case('show'):console.log('show')
// }

// let customers=[]
// let id=0;
// const yargs = require('yargs')
// yargs.command({
//     command:'add',
//     describe:"add new customers",
//     builder:{
//         customerName:{
//             type:'string',
//             demandOption:true
//         },
//         id:{
//             type:'number'
//         },
//         balance:{
//             type:'number',
//             demandOption:true
//         }
//     },
//     handler(argv){
//         customers.push({
//             name:argv.customerName,
//             id:id++,
//             balance:argv.balance
//         })
//     }
// })


// yargs.parse()
// console.log(customers)

const yargs = require('yargs')
const fs= require('fs')
let id=0;
data = [id]
try{
    data = JSON.parse(fs.readFileSync('myData.json').toString())
    id = data[0]
    // console.log(data)
}
catch(e)
{
    fs.writeFileSync('myData.json', JSON.stringify(data))
}
yargs.command({
    command: 'add',
    describe: 'add new task',
    builder:{
        id:{
            type:'number'
        },
        taskTitle:{
            type: 'string',
            demandOption:true,
            describe:'description'
        },
        taskContent:{
            type: 'string'
        }
    },
    handler(argv){
        data.push(
            {
                id:id++,
                title:argv.taskTitle, 
                content:argv.taskContent
            })
            data[0]=id
            // console.log(data,id)
            fs.writeFileSync('myData.json', JSON.stringify(data))
            console.log('Added Successfuly');

    }
})
yargs.command({
    command:'read',
    describe:'read data',
    handler(){
        // console.log(data)
        for(let i=1;i<data.length;i++){
            console.log(`id : ${data[i].id} , title : ${data[i].title} , content:${data[i].content}`)
        }
    }
})
yargs.command({
    command:'update',
    describe: 'update data',
    builder:{
        id:{
            type:'number',
            demandOption:true
        },
        taskTitle:{
            type: 'string',
        },
        taskContent:{
            type: 'string'
        }
    },
    handler(argv){
        for(let i=1;i<data.length;i++){
            if(data[i].id==argv.id){
                if(argv.taskTitle) {data[i].title=argv.taskTitle;console.log('Update Successfuly');}
                if(argv.taskContent) {data[i].content=argv.taskContent;console.log('Update Successfuly');}
                break
            }
        }
        fs.writeFileSync('myData.json', JSON.stringify(data))
    }
})

yargs.command({
    command:'delete',
    describe: 'delete data',
    builder:{
        id:{
            type:'number',
            demandOption:true
        }
    },
    handler(argv){
        for(let i=1;i<data.length;i++){
            if(data[i].id==argv.id){
               data.splice(i,1)
               console.log('Deleted Successfuly');
               break;
            }
        }
        fs.writeFileSync('myData.json', JSON.stringify(data))
    }
})


yargs.parse()