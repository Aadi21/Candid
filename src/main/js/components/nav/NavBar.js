const React = require('react');
import {NavLink} from 'react-router-dom';


export class NavBar extends React.Component {

    render() {
            return (
    			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a className="navbar-brand" href="#">Candid</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/Dashboard">Dashboard</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/position">Position</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/candidate">Candidate</NavLink>
                      </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                      <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                  </div>
                </nav>
    		)
    }

}