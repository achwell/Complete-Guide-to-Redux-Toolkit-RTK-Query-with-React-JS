import IMovie from "./IMovie"

export default interface RootObject {
    Search?: IMovie[]
    totalResults?: string
    Response: "True" | "False"
    Error?: string
}
