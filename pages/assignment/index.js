import Link from "next/link";
import useSWR, { useSWRConfig } from "swr"

const NavBar = () => {
    return <nav>
        <Link href="/">
            <a>Home</a>
        </Link>
    </nav>
}

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

const Assignment = (props) => (
    <tr key={props.assignment._id}>
        <td>{props.assignment._id}</td>
        <td>
            <Link
                as={`/assignment/${props.assignment._id}`}
                href={{
                    pathname: "/assignment/[id]",
                    query: { data: JSON.stringify(props.assignment) },
                }}>
                <button>{props.assignment.title}</button>
            </Link>
        </td>
        <td>{props.assignment.description}</td>
        <td>{props.assignment.example}</td>
        <td>{props.assignment.constraint}</td>
        <td>{props.assignment.base_code}</td>
        <td>{props.assignment.reference_code}</td>
        <td>
            <button>Edit</button>
        </td>
        <td>
            <button onClick={() => props.deleteAssignment(props.assignment._id)}>Delete</button>
        </td>
    </tr>
)

const AssignmentList = () => {
    const { mutate } = useSWRConfig()
    const { data, error } = useSWR('/api/assignment/assignment', fetcher)
    if (error) return <div>Getting Assignments Failed</div>
    if (!data) return <div>Loading...</div>

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onDelete(id) {
        const newAssignments = data.data.filter((item) => item._id !== id)
        mutate('/api/assignment', { data: newAssignments }, false)

        await fetch('/api/assignment', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })

        mutate('/api/assignment', fetcher)
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Example</th>
                        <th>Constraint</th>
                        <th>Base Code</th>
                        <th>Reference Code</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {data?.data.map((assignment) => (
                        <Assignment
                            assignment={assignment}
                            deleteAssignment={() => onDelete(assignment._id)}
                            key={assignment._id} />
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default function Index() {
    return (
        <div>
            <NavBar />
            <h1>Assignment List</h1>
            <Link href='/assignment/create'>
                <button>Add New Assignment</button>
            </Link>
            <AssignmentList />
        </div>
    );
}