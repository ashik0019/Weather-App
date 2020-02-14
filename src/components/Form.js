import React from 'react';
import './Form.style.css'
const Form = (props) => {
    return (
        <div className="container">
            <div>
                {props.error? error() : ''}
            </div>
            <form onSubmit={props.loadWeather}>
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input type="text" className="form-control" name="city" placeholder="City" autoComplete="off"/>
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" name="country" placeholder="Country" autoComplete="off"/>
                    </div>
                    <div className="col-md-3 mt-md-0 py-2 text-md-left">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

function error() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    )

}
export default Form;