let url=`https://667e43c8297972455f67ac28.mockapi.io/crud`
let tableBody=document.getElementById('tbody')
let tableHead=document.getElementById('thead')

let inputFirstName=document.getElementById('inputFirstName')
let inputLastName=document.getElementById('inputLastName')
let inputEmail=document.getElementById('inputEmail')
let inputAddress=document.getElementById('inputAddress')
let inputPincode=document.getElementById('inputPincode')
let inputGender=document.getElementsByName('inlineRadioOptions')
let inputCheck=document.getElementsByName('check')
let inputState=document.getElementById('inputState')
let inputCountry=document.getElementById('inputCountry')


function createNewElement(element,value="",atbt,atbtVal){
    let newElement=document.createElement(element);
    newElement.setAttribute(atbt,atbtVal)
    newElement.innerHTML=value
    return newElement
}

// R:READ   >GET     > RETRIVE DATA FROM THE SERVER
const getUserData=async()=>{
    let data=await fetch(url)
    let res=await data.json()

    let tr10=createNewElement("tr","","id","trhead")
    let th11=createNewElement('th',"#",'scope',"col")
    let th12=createNewElement('th',"First Name",'scope',"col")
    let th13=createNewElement('th',"Last Name",'scope',"col")
    let th14=createNewElement('th',"Email",'scope',"col")
    let th15=createNewElement('th',"Address",'scope',"col")
    let th16=createNewElement('th',"Pincode",'scope',"col")
    let th17=createNewElement('th',"Gender",'scope',"col")
    let th18=createNewElement('th',"Food",'scope',"col")
    let th19=createNewElement('th',"State",'scope',"col")
    let th20=createNewElement('th',"Country",'scope',"col")

    tr10.append(th11,th12,th13,th14,th15,th16,th17,th18,th19,th20)
    thead.append(tr10)

    res.map((element,index)=>{
        //console.log(element)
        const {FirstName,LastName,Email,Address,Pincode,Gender,Food,State,Country,id}=element
        let tr=createNewElement("tr","","id",`tr${index}`)
        //console.log(tr)
        let th1=createNewElement('th',id,'scope',"row")
        let td1=createNewElement('td',FirstName,"id",`td1${index}`)
        let td2=createNewElement('td',LastName,"id",`td2${index}`)
        let td3=createNewElement('td',Email,"id",`td3${index}`)
        let td4=createNewElement('td',Address,"id",`td4${index}`)
        let td5=createNewElement('td',Pincode,"id",`td5${index}`)
        let td6=createNewElement('td',Gender,"id",`td6${index}`)
        let td7=createNewElement('td',Food,"id",`td7${index}`)
        let td8=createNewElement('td',State,"id",`td8${index}`)
        let td9=createNewElement('td',Country,"id",`td9${index}`)
        tr.append(th1,td1,td2,td3,td4,td5,td6,td7,td8,td9)
        tbody.append(tr)
    })
   
}
getUserData()

// C:CREATE >POST    > ADD DATA TO THE SERVER

const createUserData=async()=>{
    let Genval;
    for( var check of inputGender){
        if(check.checked)
            Genval=check.value
    }
    let result=""
    for(var cbox of inputCheck){
        if(cbox.checked){
            result=result+cbox.value+" "
            console.log(result)
        }
    }
    const newUser={
        FirstName:inputFirstName.value,
        LastName:inputLastName.value,
        Email:inputEmail.value,
        Address:inputAddress.value,
        Pincode:inputPincode.value,
        Gender:Genval,
        Food:result,
        State:inputState.value,
        Country:inputCountry.value
    }
    let data=await fetch(url,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(newUser)
    })
    let res=await data.json()
    console.log(res)
    console.log(res.id)
    getUserSpecificData(res.id)
}

const getUserSpecificData=async(idNo)=>{
    let data=await fetch(`${url}/${idNo}`)
    let res=await data.json()
    console.log(res)
    const {FirstName,LastName,Email,Address,Pincode,Gender,Food,State,Country,id}=res
    let tr=createNewElement("tr","","id",`tr${id}`)
    console.log(tr)
    let th1=createNewElement('th',id,'scope',"row")
    let td1=createNewElement('td',FirstName,"id",`td1${id}`)
    let td2=createNewElement('td',LastName,"id",`td2${id}`)
    let td3=createNewElement('td',Email,"id",`td3${id}`)
    let td4=createNewElement('td',Address,"id",`td4${id}`)
    let td5=createNewElement('td',Pincode,"id",`td5${id}`)
    let td6=createNewElement('td',Gender,"id",`td6${id}`)
    let td7=createNewElement('td',Food,"id",`td7${id}`)
    let td8=createNewElement('td',State,"id",`td8${id}`)
    let td9=createNewElement('td',Country,"id",`td9${id}`)
    tr.append(th1,td1,td2,td3,td4,td5,td6,td7,td8,td9)
    tbody.append(tr)
    delField()
}

function delField(){
    document.getElementById('inputFirstName').value="";
    document.getElementById('inputLastName').value="";
    document.getElementById('inputEmail').value="";
    document.getElementById('inputAddress').value="";
    document.getElementById('inputPincode').value="";
    for( var check of inputGender){
        if(check.checked)
            check.checked=false
    }
    for(var cbox of inputCheck){
        if(cbox.checked){
            cbox.checked=false
        }
    }
    document.getElementById('inputState').value="";
    document.getElementById('inputCountry').value="";
}