function f(x){
    //return 4*((x[0]-5)**2)+((x[1]-6)**2);
    return (2*(x[0]**2))+(x[0]*x[1])+(x[1]**2);
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
function umnozh_vs(vec1,vec2){
    let c=0;
    for(let i=0;i<vec1.length;i++){
        c+=vec1[i]*vec2[i];
    }
    return c;
}
function raznost_v(a,b){
    let rez_vec=[];
    for(let i=0;i<a.length;i++){
        rez_vec[i]=a[i]-b[i];
    }
    return rez_vec;
}

function delenie_v(a,b){
    let rez_vec=[];
    let q=0;
    for(let i=0;i<a.length;i++){
        if(b[i]==0){continue;}
        rez_vec[q]=a[i]/b[i];
        q++;
    }
    return rez_vec;
}

function delenie_s(a,b){
    let rez_vec=[];
    for(let i=0;i<a.length;i++){
        rez_vec[i]=a[i]/b;
    }
    return rez_vec;
}

function norma(a,b){
    let rez_vec=[];
    rez_vec=raznost_v(a,b);
    let temp=0;
    for(let i=0;i<rez_vec.length;i++){
        temp+=rez_vec[i]**2;
    }
    temp=Math.sqrt(temp);
    return temp;
}

function rozenbruh(){
    let x0=[0.5,1];
    let x=new Array(...x0);
    let eps=0.075;
    let alpha =3;
    let beta=-0.5;
    let d=[[1,0],[0,1]];
    let delta=[0.1,0.1];
    let delta_temp=[];
    let delta_start=new Array(...delta);
    let y1=new Array(...x0);
    let y=new Array(...x0);
    let k=0;
    let i=0;
    let n=1;
    while(1){
        let sum=sum_v(y,umnozh_v(d[i],delta[i]));
        if(f(sum)<f(y)){
            y=new Array(...sum);
            delta_temp[i]=alpha*delta[i];
        }else {
            delta_temp[i]=beta*delta[i];
        }
        if(i<n){i++;continue;}//shag 3
        if(i==n){//shag3 b
            let fy=f(y);
            let fy1=f(y1);
            if(fy<fy1){
                y1=y;i=0;
                continue;
            }else if(fy==fy1){
                let fx=f(x);
                if(fy<fx){//shag4
                    if(norma(y,x)<=eps){
                        x=y;break;
                    }else{
                        let lambda=[];
                        for(let j=0;j<=n;j++){
                            lambda[j]=raznost_v(y,x);
                            lambda[j]=delenie_v(lambda[j],d[j])[0];
                        }
                        let a=[];
                        let b=[];
                        for(let j=0;j<lambda.length;j++){
                            if(lambda[j]==0) a[j]=d[j];
                            else{
                                a[j]=new Array(...d[j]);
                                for(let q=0;q<a[j].length;q++){
                                    a[j][q]=0;
                                }
                                for(let k=j;k<=n;k++){
                                    let temp=umnozh_v(d[k],lambda[k]);
                                    temp=sum_v(temp,a[j]);
                                    a[j]=temp;
                                }
                            }
                        }
                        let null_vec=new Array(...d[0]);
                        for(let q=0;q<null_vec.length;q++) null_vec[q]=0;
                        for(let j=0;j<a.length;j++){
                            if(j==0) {b[j]=a[j];
                                let temp=norma(b[j],null_vec);
                                d[j]=delenie_s(b[j],temp);
                            }
                            else{
                                let temp2=new Array(...d[0]);
                                for(let q=0;q<temp2.length;q++) temp2[q]=0;
                                for(let k=0;k<=i-1;k++){
                                    let temp=umnozh_vs(a[j],d[k]);
                                    temp=umnozh_v(d[k],temp);
                                    temp2=sum_v(temp,temp2);
                                }
                                b[j]=raznost_v(a[j],temp2);
                                let temp=norma(b[j],null_vec);
                                d[j]=delenie_s(b[j],temp);
                            }
                        }
                        delta=new Array(...delta_start);
                        i=0;
                        k++;
                        x=y;
                        y1=x;
                    }
                }else if(fy==fx){//shag 3
                    for(let k=0;k<i;k++){
                        if(Math.abs(delta[k])>eps){
                            y1=y;i=0;break;
                        }
                    }
                    
                    delta=delta_temp;
                }
            }
        }
    }
    console.log('x = ', x);
    console.log('f(x) = ',f(x));
}

export default rozenbruh;