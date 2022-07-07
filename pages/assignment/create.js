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
            title: "배열의 첫번째 항목 출력",
            description: "배열과 인덱스가 주어졌을 때, 주어진 배열의 주어진 인덱스의 항목을 출력하세요.",
            example: "main([1,2,3,4], 2) => 3",
            constraint: "주어진 배열에서 가능한 인덱스 범위를 벗어나는 값이 인덱스로 입력되었을 경우에는 '범위 밖의 인덱스입니다.'를 출력하세요.",
            base_code: "def main(lst, n):\n    return\n",
            reference_code: "def main(lst, n):\n    if 0 > n and n >= len(lst):\n        print(\"범위 밖의 인덱스입니다.\")\n    print(lst[n])\n",
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
            <button onClick={onSave}>저장</button>
        </div>
    )
}