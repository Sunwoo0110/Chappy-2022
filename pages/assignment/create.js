import Link from "next/link"
import { useRouter } from "next/router"

const NavBar = () => {
    return <nav style={{ width: '100%', height: '10%' }}>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/assignment">
            <a>Assignments</a>
        </Link>
        <h1>Create New Assignment</h1>
    </nav>
}

export default function CreateAssignment() {
    const router = useRouter()

    async function onSave(event) {
        event.preventDefault()
        let assignment = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            example: document.getElementById('example').value,
            constraint: document.getElementById('constraint').value,
            base_code: document.getElementById('base_code').value,
            reference_code: document.getElementById('reference_code').value,
        }
        await fetch('/api/assignment', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(assignment)
        })
        router.push('/assignment')
    }
    return (
        <div>
            <NavBar />
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">title</span>
                <input type="text" class="form-control" id="title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">description</span>
                <input type="text" class="form-control" id="description" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">example</span>
                <input type="text" class="form-control" id="example" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">constraint</span>
                <input type="text" class="form-control" id="constraint" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">base_code</span>
                <input type="text" class="form-control" id="base_code" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">reference_code</span>
                <input type="text" class="form-control" id="reference_code" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <button onClick={onSave}>저장</button>
        </div>
    )
}