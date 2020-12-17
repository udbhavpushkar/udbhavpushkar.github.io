


let newExpr = "58 + ( 89 * 100 )"

console.log(infix_to_postfix(newExpr))
console.log(infix_to_postfix("58 + ( 89 * 100 )"))



const expression_result=document.getElementById('expression');
let expr="";

function AppendExpression(element) {
    if(element==="*" || element==="^" || element==="-" || element==="+" || element==="/" || element==="(" || element===")") {
        expr +=" "+element+" ";
    }
    else {
        expr=expr+element;
    }
}

const wrapper = document.getElementById('wrapper')
wrapper.addEventListener('click', (event)=>{
    var isBt = event.target.tagName === 'BUTTON';
    if(isBt){
        if(event.target.id!=="ac" && event.target.id!=="equal"){
            //console.log(event.target.innerText);
            AppendExpression(event.target.innerText);
            // console.log(expr);
            expression_result.innerText = expr;
        }
    }
})

function priority(operator) {
    if( operator==='^')
        return 3;
    else if(operator === '*' || operator === '/')
        return 2;
    else if(operator === '+' || operator ==='-')
        return 1;
    else
        return -1;
}

function hasHigherPrecendence(stack_top, current) {
    // body...
    return priority(current) <= priority(stack_top);
}

function isOperand(ele) {
    return !(ele === '*' || ele === '/' || ele === '^' || ele === '+' || ele === '-' || ele === '(' || ele === ')');
}

function infix_to_postfix(infix_expr) {
    const stack=[];

    let exp_arr = infix_expr.trim().split(" ");
    let str="";
    const n=exp_arr.length;
    for(let i=0; i<n; i++) {
        if(isOperand(exp_arr[i])) {
            str=str+exp_arr[i]+" ";
        }
        else if(exp_arr[i]==='(')
            stack.push('(');
        else if(exp_arr[i]===')') {
            while(stack.length !==0 && stack[stack.length-1] !=='(') {
                let c=stack.pop();
                str=str+c+" ";
            }
            stack.pop()
        }
        else {
            while(stack.length!== 0 && hasHigherPrecendence(stack[stack.length-1], exp_arr[i])===true) {
                let c= stack.pop();
                str=str+c+" ";
            }
            stack.push(exp_arr[i]);
        }
    }
    while(stack.length !==0) {
        const c=stack.pop();
        str=str+c+" ";
    }
    str = str.replace("  ", " ");
    return str;
}


function operation(a, b, op) {
    if(op==='+')
        return a+b;
    else if(op==='-')
        return b-a;
    else if(op==='*')
        return a*b;
    else if (op==='/')
        return b/a;
    else if(op==='^')
        return Math.pow(b, a);
    else
        return -1;
}

function final_evaluation(postfix_expr) {
    const stack=[];
    let postfix_arr = postfix_expr.trim().split(" ");

    let n=postfix_arr.length;
    for(let i=0; i<n; i++)
    {
        if(!isOperand(postfix_arr[i])) {
            let a=parseInt(stack.pop());
            let b=parseInt(stack.pop());
            stack.push(operation(a, b, postfix_arr[i]))
        }
        else{
            stack.push(parseInt(postfix_arr[i]));
        }
    }
    return stack.pop();
}

const allClear = ()=>{
    expr = "";
    expression_result.innerText="";
}


const equals = ()=>{
    console.log(infix_to_postfix(expr));
    //return ans to box
    let ans = final_evaluation(infix_to_postfix(expr));
    console.log(ans);
    expression_result.innerText=ans;
    expr=""
}