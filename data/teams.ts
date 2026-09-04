import { BrainCircuit, Network, UsersRound } from 'lucide-react'


export const teamModes = [
  {
    id: 'human',
    label: 'Human judgment',
    title: 'The leader sets the question.',
    copy: 'You bring context, conviction, and the decisions only a human can make.',
    icon: UsersRound,
    color: 'bg-primary',
  },
  {
    id: 'virtual',
    label: 'Virtual specialists',
    title: 'The right mind joins the room.',
    copy: 'Myria assembles strategy, architecture, operations, transformation, and governance perspectives around your challenge.',
    icon: BrainCircuit,
    color: 'bg-accent',
  },
  {
    id: 'shared',
    label: 'Shared momentum',
    title: 'The team leaves more capable.',
    copy: 'Every conversation becomes a reusable point of view, a practical roadmap, and a clearer next move.',
    icon: Network,
    color: 'bg-foreground',
  },
]