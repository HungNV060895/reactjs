import { set } from "nprogress";
import { useState } from "react";

const SearchTodo = (props) => {
    //console.log(props);
    const {  handleSearch, filterProiority, filterStatus, setFilterPriority, setFilterStatus } = props;
    const [inputSearch, setInputSearch] = useState("");

    const handleInputChange = (event) => {
        setInputSearch(event.target.value);
        
        let stringSearch = event.target.value;
        handleSearch(stringSearch);
    }


    const handlePriorityChange = (priority) => {
        setFilterPriority(priority);
        console.log(priority);
    }

    const handleStatusChange = (status) => {
        setFilterStatus(status);
        console.log(status);
    }

    return(
        <>
            <div className="todo-search">
                <h3 className="panel-label search-ttl">Tìm kiếm task</h3>
                <div className="todo-search__content">
                    <input type="text" className="form-control form-controll--select" placeholder="Tìm kiếm task..." onChange={handleInputChange} value={inputSearch} />
                    <dl>
                        <dt className="panel-label">Priority:</dt>
                        <dd>
                            <select name="filterPriority" id="filterPriority" className="form-control form-control--select" onChange={(e)=>handlePriorityChange(e.target.value)} value={filterProiority}>
                                <option value="all">Tất cả</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </dd>
                    </dl>
                    <dl>
                        <dt className="panel-label">Status:</dt>
                        <dd>
                            <select name="filterStatus" id="filterStatus" className="form-control form-control--select" onChange={(e)=>handleStatusChange(e.target.value)} value={filterStatus}>
                                <option value="all">Tất cả</option>
                                <option value="complete">Hoàn thành</option>
                                <option value="incomplete">Chưa hoàn thành</option>
                            </select>
                        </dd>
                    </dl>
                </div>
            </div>
        </>
    )
}
export default SearchTodo;