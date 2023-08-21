import React, {useState, useEffect} from 'react';

const Home = () => {

    const [userData, setUserData] = useState('');
    
    const callHomePage = async() => {
        try{
            const res = await fetch('/about', {
                method : 'GET',
                headers : {
                    "Accept" : "application/json",
                    "Contant-Type" : "application/json"
                },
                credentials : "include"
            });
           
            const data = await res.json();
            //console.log(data);
            if(res.status == 200){
                setUserData(data.name);
            }else{
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callHomePage();
    }, []);
    return(
        <>
            <section className = "row p-0 m-0 divbg vh-100">
                <div className = "leftdiv col-6"></div>
                <div className = "rightdiv col-6"></div>
            </section>
            <section className = "divfront text-center">
                <p className = "text-primary fw-bold fs-2 mb-0">WELCOME</p>
                {
                    (userData !== '') ?
                        <div>
                            <p className = "fw-bold text-capitalize fs-1 mb-0">{userData}</p>
                            <p className = "fs-4 fw-bold text-muted mb-0">Happy To See You Back</p>
                        </div>
                        : 
                        <p className = "fw-bold fs-4 mb-0">We Are MERN Stack Developer</p>
                }
            </section>
        </>
    )
}

export default Home;

