const prevatie_key=[
    {
        ekey:'Y',
        numkey:'0'
    },
    {
        ekey:'j',
        numkey:'1'
    },
    {
        ekey:'h',
        numkey:'2'
    },
    {
        ekey:'W',
        numkey:'3'
    },
    {
        ekey:'z',
        numkey:'4'
    },
    {
        ekey:'-',
        numkey:'5'
    },
    {
        ekey:'m',
        numkey:'6'
    },
    {
        ekey:'~',
        numkey:'7'
    },{
        ekey:'^',
        numkey:'8'
    },
    {
        ekey:'A',
        numkey:'9'
    },
]
class ConvertUtil {
    static async rand(min,max) {
        let num=Math.floor(Math.random()*(max-min))+min
        return num.toString();
    }
      
    static async changeNum(num,n){
        return (Array(n).join(0) + num).slice(-n);
    }
    static async preConver(num){
        // 将数字字符串转换为数组字符串
        let new_num="";
        for(let i=0;i<num.length;i++){
            let new_item=num.substring(i,i+1)+',';
            new_num+=new_item
        };
        new_num=new_num.split(',');
        new_num=new_num.filter((item)=>{
            return !item==""
        });
        let code = "";
        // 将数字按照加密转换密文
        new_num.forEach((item) => {
            prevatie_key.forEach((s)=>{
                    if(s.numkey==item){
                        code+=s.ekey;
                    }
                     
                })
            });
        return code
    }

    static async decConver(letter){
        // 将数字字符串转换为数组字符串
        let new_letter="";
        for(let i=0;i<letter.length;i++){
            let new_item=letter.substring(i,i+1)+',';
            new_letter+=new_item
        };
        new_letter=new_letter.split(',');
        new_letter=new_letter.filter((item)=>{
            return !item==""
        });
        let code = "";
        // 将数字按照加密转换密文
        new_letter.forEach((item) => {
            prevatie_key.forEach((s)=>{
                    if(s.ekey==item){
                        code+=s.numkey;
                    } 
                })
            });
        return code
    }
}
module.exports = ConvertUtil 