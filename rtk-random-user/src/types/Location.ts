import Street from "./Street"
import Coordinates from "./Coordinates"
import Timezone from "./Timezone"

export default interface Location {
    street: Street
    city: string
    state: string
    country: string
    postcode: number
    coordinates: Coordinates
    timezone: Timezone
}
