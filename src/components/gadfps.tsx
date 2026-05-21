const executiveCommittee = [
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
]

const technicalWorkingGroup = [
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
  'Employee Name',
]

const gadSecretariat = [
  'Employee Name',
  'Employee Name',
]

interface ColumnProps {
  title: string
  members: string[]
}

function Column({ title, members }: ColumnProps) {
  return (
    <div className="flex-1 min-w-0">
      {/* Header row */}
      <div className="border border-[#282974] bg-[#282974]/5">
        <p className="text-[13px] font-extrabold uppercase text-[#282974]" style={{ padding: '12px 16px' }}>
          {title}
        </p>
      </div>
      {/* Member rows */}
      {members.map((name, i) => (
        <div
          key={i}
          className="border-b border-x border-[#282974]/20 hover:bg-[#282974]/5 transition-colors duration-150"
        >
          <p className="text-[13px] text-gray-800" style={{ padding: '12px 16px' }}>
            {name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Gadfps() {
  return (
    <section className="w-full bg-white" style={{ padding: '80px 80px 80px 80px' }}>
      {/* Section label */}
      <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
        <div className="h-px w-10 bg-[#282974]" />
        <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#282974]">
          CIAC Gender and Development
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-[#282974]" style={{ marginBottom: '40px' }}>
        GAD Focal Point System
      </h2>

      {/* Three-column table */}
      <div className="flex gap-8 items-start">
        <Column title="Executive Committee" members={executiveCommittee} />
        <Column title="Technical Working Group" members={technicalWorkingGroup} />
        <Column title="GAD Secretariat" members={gadSecretariat} />
      </div>
    </section>
  )
}