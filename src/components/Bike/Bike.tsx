import { IBike } from "types"

const Bike = ({bike}:{bike:IBike}) => {
  return (
    <div>{bike.title}</div>
  )
}

export default Bike 