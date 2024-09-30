import { useEffect, useState } from 'react'; // Import useState hook
import Rprofile from "../../Components/Receiver/RprofileBox";
import RecieverTable from "../../Components/Receiver/Reciever_dash_table";
// import { text } from 'cheerio';
import {database} from '../../firebase_config';
import { collection, getDocs,query,where } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
// import helphand from '../../assets/helphand.jpg';
import helphand from '../../assets/back.png'


const DashboardApp = ({mydetails}) => {
  // const {mydetails}=useLocation();
  
  const [recdata, setRecdata] = useState([]); // State to store data from the database
  const [filtereddata, setFiltereddata] = useState([]);
  
  const inputsearch = () => {
    const formvalues = document.querySelectorAll('input');
    const data = {};
    formvalues.forEach((input) => {
      if (input.value!="")
        data[input.name] = input.value;
    });
    console.log("data",data);
    const arr = recdata.filter((item) => {
      for (let key in data) {
        if (item[key] === undefined || item[key].trim() !== data[key].trim())
          return false;
      }
      return true;
    });

    setFiltereddata(arr);
    console.log('filtereddata',filtereddata);
  }
   

  const fetchthegivers =async()=> {
   try
   {
    // fetch data from caretakers collection
    
      const querySnapshot = await getDocs(collection(database, 'caretakers'));
      const arr = [];
      querySnapshot.forEach((doc) => {
        
        arr.push(doc.data());
      });
      setRecdata(arr);

    }
    catch(e)
    {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchthegivers();
  }
  , []); // Empty dependency array
  
  
  
  return (
    <div style={styles.maincont}>
      <div>
       
      </div>
      <div style={styles.content}>
        <div style={styles.dashcont}>
          <div style={styles.abovecont}>
            <div style={styles.inputforms}>
              {/* Wrap the form inside the input form container */}
              <form style={styles.form} name="searchForm">
  <div>
    <label style={styles.label } htmlFor="experience">Experience yrs:</label>
    <input type="text" id="experience" name="yearsOfExperience" placeholder="Years of Experience" style={styles.input} />
  </div>
  <div>
    <label style={styles.label } htmlFor="availability">Availability:</label>
    <input type="text" id="availability" name="availability" placeholder="Availability(eg.weekdays)" style={styles.input} />
  </div>
  <div>
    <label style={styles.label } htmlFor="servicesOffered">Services Offered:</label>
    <input type="text" id="servicesOffered" name="servicesOffered" placeholder="Enter offered services" style={styles.input} />
  </div>
  <div>
    <label style={styles.label } htmlFor="qualification">Qualification:</label>
    <input type="text" id="qualification" name="qualification" placeholder="Enter qualification" style={styles.input} />
  </div>
  <div>
    <label style={styles.label } htmlFor="interestsAndHobbies">Interests and Hobbies:</label>
    <input type="text" id="interestsAndHobbies" name="interestsAndHobbies" placeholder="Interests & Hobbies" style={styles.input} />
  </div>
  <div>
    <label style={styles.label } htmlFor="age">Age:</label>
    <input type="text" id="age" name="age" placeholder="Enter age" style={styles.input} />
  </div>
  <div>
    <label style={styles.label } htmlFor="spokenLanguages">Spoken Languages:</label>
    <input type="text" id="spokenLanguages" name="languagesSpoken" placeholder="Enter spoken languages" style={styles.input} />
  </div>
  <button type="button" style={styles.searchButton} onClick={inputsearch}>Search</button> {/* Set type to "button" */}
</form>


            </div>
          </div>
          <div style={styles.tablecont}>
          <RecieverTable tabdat={filtereddata.length!=0 ? filtereddata:recdata } myemail={mydetails.email} mydet={{name:mydetails.name,imageurl:mydetails.imageUrl}}/>
          

          </div>
        </div>
      </div>
      {/* <footer style={styles.footer}>
                 <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
            </footer> */}
    </div>
  );
}

const styles = {
  maincont: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '80%',
    backgroundImage: `url(${helphand})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'top',
  position: 'absolute',
  top: '0',

  },
  // nav: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#cef0ef',
  //   color: 'black',
  //   fontWeight: 'bold',
  //   fontFamily: 'Arial',
  //   height: '12vh',
  // },
  btn: {
    border: '1px solid black',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '9px',
    color: 'black',
    marginRight: '10px',
  },
  content: {
    flex: 1, // Take remaining space
    display: 'flex',
    width: '100%',
    margin: 'auto',
    // height: '10vh',
    // backgroundColor: '#97a2bd',
  },
  dashcont: {
    // border: '1px solid red',
    // backgroundColor: 'yellow',
    // flex: 1, // Take up the remaining space
    // marginTop: '10px',
    // height: '100vh',
    width: '100%',
  
    
  },
  
  tablecont: {
    width: '90%',
    margin: 'auto',
    // height: '100%',
    
  },
  abovecont: {
    // backgroundColor: '#97a2bd',
    height: '35vh',
    marginBottom: '20px',
    marginTop: '10px',
    display:'flex',
    
    alignItems:'center',
    
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    flexWrap: 'wrap',
    padding: '10px',
    // backgroundColor: '#6b7385',
    // backgroundColor: 'transparent',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
    marginBottom: '10px',
    backgroundColor: 'white',
    color: 'black',
    fontSize:'18px',
  },
  
  searchButton: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  inputforms: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexWrap: 'wrap',
    borderRadius: '15px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: '80%',
    margin: 'auto',
    maxWidth: '1200px', // Set maximum width for input forms container
    
  },
  label: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'black',
    marginRight: '10px',
  },
  footer: {
    backgroundColor: '#cef0ef',
    color: 'black',
    textAlign: 'center',
    // padding: '20px',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    // height:"20px",
    margin: '0',
    justifyContent: 'center',
    alignItems: 'center',
},

}

export default DashboardApp;
