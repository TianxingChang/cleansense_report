import { Inter } from 'next/font/google'
import CardZone from './components/CardZone'
import TopBar from './components/TopBar'

const inter = Inter({ subsets: ['latin'] })

const totalArray = [[0,1,15,16,4,1],["lg1", "g", "lg4","lg5","lg7","1"]]


// Create a new array of objects that map the values of the first and second arrays
const mappedArray = totalArray[0].map((value, index) => {
  return { value: value, label: totalArray[1][index] };
});

// Sort the mapped array based on the value property
mappedArray.sort((a, b) => a.value - b.value);

// Create a new array that maps the sorted values back to the original format
const sortedArray = [
  mappedArray.map((item) => item.value),
  mappedArray.map((item) => item.label),
];



export default function Home() {
  return (
    <main> 
      <TopBar></TopBar> 
      <CardZone Array={sortedArray}>
      </CardZone>
    </main>
  )
}
