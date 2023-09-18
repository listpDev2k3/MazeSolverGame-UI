import { useEffect } from "react";

const Menu = ({ onSearch, setCurrentPosition, getLevel }) => {
    return (
        <div className="menu">
            <div>
                <button
                    className="start"
                    type="text"
                    onClick={()=>{
                        setCurrentPosition({ x: 0, y: 0 })
                    }}
                >
                    Bắt Đầu Lại
                </button>
            </div>
            <div>
                <select className="menu_level" onChange={e =>getLevel(e.target.value)}>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                </select>
            </div>
            <div>
                <button
                    className="breadthSearch"
                    type="text"
                    onClick={() => {
                        onSearch("BFS");
                    }}
                >
                    Tìm Kiếm Theo Chiều Rộng BFS
                </button>
                <button
                    className="depthSearch"
                    type="text"
                    onClick={() => {
                        onSearch("DFS");
                    }}
                >
                    Tìm Kiếm Theo Chiều Sâu DFS
                </button>
            </div>
            
        </div>
    );
}
export default Menu;