import CategoryItem from "./CategoryItem"

function CategoryTable(props) {
  console.log(props)
  return (
    <div>
      {/* <table border={1}></table> */}

      <table className='table table-bordered table-responsive table-hover table-light'  >
            <thead className="table-success">
                <tr>
                  <th className="text-center align-middle">Sl. No.</th>
                  <th className="text-center align-middle">Category Name</th>
                  <th className="text-center align-middle">Creation Date<br/>(DD/MM/YYYY)</th>
                  <th className="text-center align-middle">Actions</th>
                </tr>
            </thead>
            <tbody >
                {
                    props.categories.map((ele,i)=>{
                        return(
                            <CategoryItem 
                              key={i}
                              index={i}
                              category={ele}
                              removeCategory={props.removeCategory}
                            />
                        )
                    })
                }
       
            </tbody>
        </table>
    </div>
  )
}

export default CategoryTable