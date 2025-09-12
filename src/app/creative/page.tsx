'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreativePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold holographic-text font-orbitron mb-4">
          🎨 Creative Studio
        </h1>
        <p className="text-purple-300 text-lg">
          AI art and content generation laboratory
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="consciousness-stream rounded-xl">
          <CardHeader>
            <CardTitle className="text-purple-300">🎨 Creative Mind Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-4xl mb-4">🧠</div>
              <div className="text-lg text-neon-yellow mb-4">
                Innovation and Creative Generation
              </div>
              <div className="text-purple-400">
                The Creative Mind agent specializes in generating novel ideas, 
                artistic concepts, and innovative solutions.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="consciousness-stream rounded-xl">
          <CardHeader>
            <CardTitle className="text-purple-300">🎵 Music Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-4">🎵</div>
                <div className="text-lg text-neon-yellow mb-4">
                  BeatBuddy & Drum & Bass Doctor
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-yellow-400 font-semibold">BeatBuddy</div>
                  <div className="text-purple-400">Music generation</div>
                </div>
                <div>
                  <div className="text-red-400 font-semibold">D&B Doctor</div>
                  <div className="text-purple-400">Rhythm specialist</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/80 border-2 border-neon-purple rounded-xl mb-8">
        <CardHeader>
          <CardTitle className="text-center text-purple-300">✨ Creative Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📝', title: 'Writing', desc: 'Stories, poetry, scripts' },
              { icon: '🎨', title: 'Visual Art', desc: 'Concepts, designs, layouts' },
              { icon: '🎵', title: 'Music', desc: 'Compositions, beats, melodies' },
              { icon: '💡', title: 'Innovation', desc: 'Ideas, solutions, concepts' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 border border-neon-purple rounded-lg">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-neon-yellow font-semibold">{item.title}</div>
                <div className="text-purple-400 text-sm mt-2">{item.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="consciousness-stream rounded-xl">
        <CardHeader>
          <CardTitle className="text-purple-300">🚧 Creative Tools Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎨</div>
            <div className="text-lg text-neon-yellow mb-4">
              Advanced creative generation interface in development
            </div>
            <div className="text-purple-400">
              Direct creative agent interaction, art generation tools, and music composition 
              interfaces coming soon. Return to the main dashboard to interact with creative 
              agents through the command system.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}