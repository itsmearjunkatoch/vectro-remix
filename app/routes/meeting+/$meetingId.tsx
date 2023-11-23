import { Anchor, Title } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
	getMeetingData,
	getMeetingTitle,
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
	const meeting = meetings.find(m => m.meetingId === params.meetingId)
	if (!meeting) {
		throw new Response('Not found', { status: 404 })
	}
	return { user: user, meeting: meeting }
}

export default function MeetingsRoute() {
	const { meeting } = useLoaderData<typeof loader>()
	return (
		<>
			<div className="!mx-auto flex flex-col">
				<Title order={3} className="!mx-auto">
					{getMeetingTitle(meeting)}
				</Title>
				<div className="mx-auto mt-7">
					<ul className="list-disc">
						<li className="list-disc">Meeting Id: {meeting.meetingId}</li>
						<li className="list-disc">Company Name: {meeting.companyName}</li>
						<li className="list-disc">
							<Anchor href={meeting.link}>Grain Link</Anchor>
						</li>
						<li className="list-disc">
							Sales Reps: {meeting.salesReps.map(r => r.name).join(',')}
						</li>
						<li>Participants: {meeting.participants}</li>
					</ul>
				</div>
			</div>
		</>
	)
}
