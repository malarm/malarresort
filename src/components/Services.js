import React, { Component } from 'react';
import Title from '../components/Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "free cocktail",
                info: "React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing"
            },
            {
                icon: <FaHiking />,
                title: "Endless Hiking",
                info: "React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing"
            },
            {
                icon: <FaShuttleVan />,
                title: "free ShuttleVan",
                info: "React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing"
            },
            {
                icon: <FaBeer />,
                title: "Strongest Beer",
                info: "React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing"
            }


        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="Services" />
                <div className="services-center">
                    {
                        this.state.services.map((item, index) => {
                            return (
                                <article key={index} className="service">
                                    <span> {item.icon}</span>
                                    <h6>{item.title}</h6>
                                    <p> {item.info}</p>
                                </article>
                            )
                        }

                        )}
                </div>

            </section>
        )
    }
}
export default Services;