function TableSkeleton({ rows = 5 }) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>
                            <div className="skeleton h-4 w-4 rounded"></div>
                        </th>
                        <th>
                            <div className="skeleton h-4 w-24"></div>
                        </th>
                        <th>
                            <div className="skeleton h-4 w-40"></div>
                        </th>
                        <th>
                            <div className="skeleton h-4 w-16"></div>
                        </th>
                        <th>
                            <div className="skeleton h-4 w-20"></div>
                        </th>
                        <th>
                            <div className="skeleton h-4 w-24"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <tr key={index}>
                            <td>
                                <div className="skeleton h-5 w-5 rounded"></div>
                            </td>
                            <td>
                                <div className="skeleton h-4 w-32"></div>
                            </td>
                            <td>
                                <div className="skeleton h-4 w-56 max-w-full"></div>
                            </td>
                            <td>
                                <div className="skeleton h-4 w-12"></div>
                            </td>
                            <td>
                                <div className="skeleton h-4 w-16"></div>
                            </td>
                            <td>
                                <div className="skeleton h-8 w-20 rounded-lg"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableSkeleton;
