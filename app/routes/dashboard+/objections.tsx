import { Select, Image } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import chartImage from '#app/assets/chart.jpg'
import ObjectionsTable from '#app/components/widgets/objections-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
	getAllObjectionCategories,
	getAllProspects,
	getMeetingData,
} from '#app/utils/meetings/meetings.tsx'

export async function loader({ params, request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const user = prisma.user.findUniqueOrThrow({
		select: {
			id: true,
			name: true,
			username: true,
			image: { select: { id: true } },
			roles: {
				select: {
					name: true,
					permissions: {
						select: { entity: true, action: true, access: true },
					},
				},
			},
		},
		where: { id: userId },
	})
	const meetings = getMeetingData()
	const prospects = getAllProspects(meetings)
	const objectionCategories = getAllObjectionCategories()

	return {
		user: user,
		meetings: meetings,
		prospects: prospects,
		objectionCategories: objectionCategories,
	}
}

export default function ObjectionsDashboard() {
	const [selectedPropsectName, setValue] = useState('All')
	const [selectedCategory, setCategory] = useState('All')
	const { meetings, prospects, objectionCategories } =
		useLoaderData<typeof loader>()
	if (!selectedPropsectName) {
		setValue('All')
	}
	let prospectsFinal = prospects.concat('All')
	let categoriesFinal = objectionCategories.concat('All')

	return (
		<>
			<div className="flex basis-10 justify-end gap-10 space-x-40 space-y-40">
				<div className="mx-auto flex flex-col gap-4">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Objections Dashboard
					</h1>
					<div className="flex gap-6">
						<Select
							label="Prospect"
							placeholder="Pick value"
							data={prospectsFinal}
							defaultValue={'All'}
							className="w-fit"
							value={selectedPropsectName}
							onChange={value => setValue(value ?? '')}
						/>
						<Select
							label="Objection Categories"
							placeholder="Pick value"
							data={categoriesFinal}
							defaultValue={'All'}
							className="w-fit"
							value={selectedCategory}
							onChange={value => setCategory(value ?? '')}
						/>
					</div>
					<ObjectionsTable
						m={meetings}
						customer_name={selectedPropsectName}
						filteredCategory={selectedCategory}
						fetchAll={selectedPropsectName === 'All'}
					/>
					{selectedPropsectName === 'All' && selectedCategory === 'All' && (
						<Image src={chartImage} alt="chart" radius="md" />
					)}
				</div>
			</div>
		</>
	)
}
