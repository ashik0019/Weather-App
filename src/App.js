import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'font-awesome/css/font-awesome.min.css';
import './App.css'
//api.openweathermap.org/data/2.5/weather?q=London,uk
import Weather from "./components/weather";
import Form from "./components/Form";
const API_KEY = "0248e6cddc94d13684fcfb152d29b77d";



class App extends Component {
    weather;
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            description:"",
            error: false,
        }

        this.weatherIcon = {
            Thunderstorm: "fas fa-poo-storm",
            Drizzle: "fas fa-cloud-sun-rain",
            Rain: "fas fa-cloud-rain",
            Snow: "fas fa-snowflake",
            Atmosphere: "",
            Clear: "far fa-thunderstorm",
            Cloud: "far fa-thunderstorm",
        }
    }
    calCelsius(temp) {
        let cel = Math.floor(temp - 273.15);
        return cel;
    }

    get_WeatherIcon(icons,rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({icons: this.weatherIcon.Thunderstorm});
            break;
            case rangeId >= 300 && rangeId <= 331:
                this.setState({icons: this.weatherIcon.Drizzle});
            break;
            case rangeId >= 500 && rangeId <= 531:
                this.setState({icons: this.weatherIcon.Rain});
            break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({icons: this.weatherIcon.Snow});
            break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({icons: this.weatherIcon.Atmosphere});
            break;
            case rangeId === 800:
                this.setState({icons: this.weatherIcon.Clear});
            break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({icons: this.weatherIcon.Cloud});
            break;
            default:
                this.setState({icons: this.weatherIcon.Cloud});
        }
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        if (city && country) {
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
            const response = await api_call.json();
            console.log(response.weather[0].id)
            this.setState({
                city: `${response.name}, ${response.sys.country}`,
                country: response.sys.country,
                icon: this.weatherIcon.Thunderstorm,
                celsius: this.calCelsius(response.main.temp),
                temp_max: this.calCelsius(response.main.temp_max),
                temp_min: this.calCelsius(response.main.temp_min),
                description: response.weather[0].description,
                error: false
            });
            this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
        }else {
            this.setState({error: true})
        }
    };


    render() {
        return (
            <div className="App">
                <Form loadWeather={this.getWeather} error={this.state.error}/>
                <Weather
                    city={this.state.city}
                     main={this.state.main}
                     country={this.state.country}
                     temp_celsius={this.state.celsius}
                     temp_min={this.state.temp_min}
                     temp_max={this.state.temp_max}
                     description={this.state.description}
                    weatherIcon={this.state.icon}
                />
            </div>
        );
    }
}

export default App;
