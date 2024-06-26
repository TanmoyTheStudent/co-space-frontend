import React from "react"

const Pagination = ({
    totalOffices,
    officesPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalOffices / officesPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination justify-content-center' >
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "btn btn-outline-warning m-2 active" : "btn btn-outline-warning m-2"}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;