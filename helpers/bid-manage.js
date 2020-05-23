
const Product = require('../models/products');
const sendNotfication = require('../helpers/send-notfication');

exports.startBid = async ()=>{
    try{
        const products = await Product.find({bidStatus:'binding',approve:'approved'});
        products.forEach(p=>{
            p.startBid();
        });
        if(products.length>0){
            const body = {
                id: ' ',
                key:'4',
                data:'تم بدء المزاد'
            };
            const notfi= {
                title:`تم بدء المزاد`,
                body:'يمكنك الان المزايده علي اي منتج'
            };
            const n = await sendNotfication.sendAll(body,notfi);
            console.log(n);
            
    }
        
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500; 
        }
        throw(err);
    }
};

exports.endBid = async ()=>{
    try{
        const products = await Product.find({bidStatus:'started',approve:'approved'}).populate('user').populate('lastPid');
        products.forEach( p=>{
            
            if(p.TotalPid==0){
                const Sbody = {
                    id: p._id.toString(),
                    key:'5',
                    data: p.TotalPid.toString()
                };
                const Snotfi= {
                    title:`للاسف لم يقم احد بالمزايده علي منتجك`,
                    body:'يمكنك الانتظار لمزاد غدا او يمكنك حزف المنتج'
                };
                const n =  sendNotfication.send(p.user.FCMJwt,Sbody,Snotfi,[p.user._id]);
            
            }else if(p.TotalPid<p.price){
                const Sbody = {
                    id: p._id.toString(),
                    key:'5',
                    data: p.TotalPid.toString()
                };
                const Snotfi= {
                    title:`للاسف لم يصل منتجك للسعر المطلوب`,
                    body:'يمكنك التواصل مع المشتري وبيع المنتج او الانتظار ربما يصل للسعر غدا'
                };
                const n =  sendNotfication.send(p.user.FCMJwt,Sbody,Snotfi,[p.user._id]);
            }
            else{
                const Sbody = {
                    id: p._id.toString(),
                    key:'5',
                    data: p.TotalPid.toString()
                };
                const Snotfi= {
                    title:`تهانينا وصل منتجك للسعر المطلوب`,
                    body:'يمكنك الان التواصل مع المشتري'
                };
                const n = sendNotfication.send(p.user.FCMJwt,Sbody,Snotfi,[p.user._id]);
            }
            if(p.lastPid){
                const newBody = {
                    id: p._id.toString(),
                    key:'2',
                    data:'تهانينا لقد فذت بالمزاد'
                };
                const newNotfi= {
                    title:`تهانينا لقد فذت بالمزاد`,
                    body:'انتظر حتي يتواصل معك البائغ'
                };
                const newN = sendNotfication.send(p.lastPid.FCMJwt,newBody,newNotfi,[p.lastPid._id]);
            }
            p.endtBid();
            
        });
        if(products.length>0){
            const body = {
                id: ' ',
                key:'4',
                data:'تم انتهاء المزاد'
            };
            const notfi= {
                title:`تم انتهاء المزاد`,
                body:'سيتم فتح المزاد غدا'
            };
            const n = sendNotfication.sendAll(body,notfi);
                    
        }
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500; 
        }
        throw(err);
    }
};