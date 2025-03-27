import 'remixicon/fonts/remixicon.css';
import SpinProfile from './SpinProfile';
import Hare from './Hare';
import Navbar from "./Navbar";
// import ChatPage from "./Channel";

function MainPage() {
  return (
    <>
    <div className='h-screen w-full'>
      <Navbar/>
      <Hare/> 
      {/* <SpinProfile /> */}
    </div>
    </>
    
  )
}

export default MainPage;
