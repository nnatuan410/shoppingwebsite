import React,{useState,useEffect} from 'react'

export default function Hook() {
    const[count, setCount]=useState(0);
    useEffect(() => {
        setCount(2)
        document.title = 'You click '+ count +' times';
        if(count==5){
            alert("ban da click 5 lan")
        }
    })
    return (
        <div>
            <p>Your number: {count}</p>
            <button onClick={()=> setCount(count+1)}>+</button>
            <button onClick={()=> setCount(count-1)}>-</button>
        </div>
    )
}




// - tao du an tren git
// - lay du an ve may: git clone + URl 
// - copi file vao thu muc git de dua len git 
// - add all file vao git : git add -A 
// - ghi chu : git commit -a -m "upcode frontend"
// - dua code len git : git push origin ten-nhanh-dang-lam

// conflic

// Hook
// redux