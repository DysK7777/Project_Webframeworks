export interface CarModel {
    id: number;
    name: string;
    brand_id: number;
    type: string;
    year: number;
    fuel_type: string;
    top_speed_kmh: number;
    acceleration_0_to_100_kmh: number;
    horsepower: number;
    transmission: string;
    seating_capacity: number;
    Heart?:Boolean
  }
  export interface CarFlatlistProps {
    refresh: () => Promise<void>
    searchTerm: string
    filteredCars: CarModel[]
    carModels: CarModel[]
    refreshing: boolean
    setSelectedCar: (value: React.SetStateAction<CarModel | null>) => void
    deleteCar?: (carId: number) => Promise<void>
}
export interface CarSearchProps {
  searchTerm: string,
  setSearchTerm: (value: React.SetStateAction<string>) => void,
  carModels: CarModel[],
  setFilteredCars: (value: React.SetStateAction<CarModel[]>) => void
}
export interface CarModelProps {
    selectedCar: CarModel;
    setSelectedCar:React.Dispatch<React.SetStateAction<CarModel | null>>
    toggleHeartStatus:(car: CarModel) => Promise<void>
}