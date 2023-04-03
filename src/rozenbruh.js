function f(x){
    return ((x[0]-2)**4)+((x[0]-2*x[1])**2);
}
function sum_v(a,b){
    let c=[];
    for(let i=0;i<a.length;i++)
        c[i]=a[i]+b[i];
    return c;
}
function umnozh_v(vec,delta){
    let c=[];
    for(let i=0;i<vec.length;i++){
        c[i]=vec[i]*delta;
    }
    return c;
}

function norma(a,b){
    let rez_vec=[];
    for(let i=0;i<a.length;i++){
        rez_vec[i]=a[i]-b[i];
    }
    let temp=0;
    for(let i=0;i<rez_vec.length;i++){
        temp+=rez_vec[i]**2;
    }
    temp=Math.sqrt(temp);
    return temp;
}

function rozenbruh(){
    let x0=[0,0];
    let eps=0.1;
    let alpha =2;
    let beta=-0.5;
    let d=[[1,0],[0,1]];
    let delta=[0.1,0.1];
    let y1=new Array(x0);
    let y=new Object(x0);
    let k=i=0;
    let n=1;
    while(1){
        if(f(y[i]+delta[i]*d[i])<f(y)){//shag 2
            y=y+delta[i]*d[i];
            delta[i]=alpha*delta[i];
        }
        else {
            delta[i]=beta*delta[i];
        }
        if(i<n){i++;continue;}//shag 3
        if(i==n){
            let fy=f(y);
            let fy1=f(y1);
            if(fy<fy1){
                y1=y;i=0;
                continue;
            }else if(fy==fy1){
                let fx=f(x);
                if(fy<fx){
                    if(norma(y)-norma(x)<=eps){
                        x=y;break;
                    }else{
                        let lambda=[];
                        for(let j=0;j<n;j++){
                            lambda[j]=()
                        }
                    }
                }else if(fy==fx){
                    let flag=false;
                    for(let k=0;k<i;k++){
                        if(Math.abs(delta[k])>eps){
                            y1=y;i=0; flag=true;break;
                        }
                    }
                    if(flag) break;
                }
            }
        }
    }

}

export default rozenbruh;