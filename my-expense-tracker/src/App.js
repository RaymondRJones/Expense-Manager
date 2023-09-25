import logo from './logo.svg';
import './App.css';
import UserTable from './components/UserTable';
import {users} from './static'
const App = () => {
  return (
    <div className="main-page">
      <div className="left-side">

      </div>
      <div className="right-side">
        <UserTable users={users}/>
      </div>
    </div>
  );
}

export default App;