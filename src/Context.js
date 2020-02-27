import React, { Component } from 'react';
import items from './data';

import Client from './Contentful';

/*Client.getEntries({
    content_type: "malarresort"
}).then(respnse => console.log(respnse.items));*/

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        /* greeting: 'Hello',
         name: 'Malar'*/
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    //getData
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "malarresort",
                // order: 'sys.createdAt'
                // order: "- fields-price"
            })
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room =>
                room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getData();
        // console.log(featuredRooms)
    }
    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image =>
                image.fields.file.url)
            let room = { ...item.fields, images, id }
            return room;
        })
        return tempItems;
    }

    getRoom = slug => {
        let temRooms = [...this.state.rooms];
        const room = temRooms.find(room => room.slug === slug)
        return room;
    }

    handleChange = e => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = e.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms)
        //console.log(type, name, value);
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxPrice, breakfast, pets
        } = this.state
        //all the rooms
        let temRooms = [...rooms];
        //transform value
        capacity = parseInt(capacity)
        //transform value of price
        price = parseInt(price);
        //filter by type
        if (type !== "all") {
            temRooms = temRooms.filter(room => room.type ===
                type);
        }
        //filter by capacity
        if (capacity !== 1) {
            temRooms = temRooms.filter(room =>
                room.capacity >= capacity);
        }
        // filter by price
        temRooms = temRooms.filter(room =>
            room.price <= price)

        /*fileter by size
        temRooms = temRooms.filter(room =>
            room.size >= minSize && room.size <= maxSize);*/

        // filter by breakfast
        if (breakfast) {
            temRooms = temRooms.filter(room => room.breakfast === true)
        }
        //filter by pets
        if (pets) {
            temRooms = temRooms.filter(room => room.pets === true)
        }
        //change state
        this.setState({
            sortedRooms: temRooms
        })
    }
    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom, handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext }