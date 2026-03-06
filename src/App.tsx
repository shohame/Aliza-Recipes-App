/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Soup, Cake, ChevronLeft, Search, ArrowRight, ChefHat, Clock, Users, BookOpen } from 'lucide-react';
import { recipes, categories, Recipe } from './data/recipes';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'recipe'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter(r => 
    (selectedCategory ? r.category === selectedCategory : true) &&
    (r.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('category');
    window.scrollTo(0, 0);
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentView === 'recipe') {
      setCurrentView('category');
    } else if (currentView === 'category') {
      setCurrentView('home');
      setSelectedCategory(null);
    }
    window.scrollTo(0, 0);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-6 h-6" />;
      case 'Soup': return <Soup className="w-6 h-6" />;
      case 'Cake': return <Cake className="w-6 h-6" />;
      default: return <ChefHat className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setCurrentView('home'); setSelectedCategory(null); }}>
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <ChefHat className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">המתכונים של אמא (עליזה)</h1>
          </div>
          
          {currentView !== 'home' && (
            <button 
              onClick={handleBack}
              className="flex items-center gap-1 text-stone-500 hover:text-emerald-600 transition-colors"
            >
              <span>חזור</span>
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4 py-8">
                <h2 className="text-4xl font-extrabold text-stone-900">המתכונים של אמא</h2>
                <p className="text-stone-500 text-lg">קטגוריות</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="relative h-64 rounded-3xl overflow-hidden shadow-lg group"
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 right-6 text-white text-right">
                      <div className="bg-emerald-500/20 backdrop-blur-md p-2 rounded-xl inline-block mb-2">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <h3 className="text-2xl font-bold">{cat.title}</h3>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-600" />
                  חיפוש מהיר
                </h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="חפשו מתכון..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-100 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-6 grid grid-cols-1 gap-4">
                    {filteredRecipes.slice(0, 5).map(recipe => (
                      <button 
                        key={recipe.id}
                        onClick={() => handleRecipeSelect(recipe)}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200"
                      >
                        <div className="flex items-center gap-4">
                          <img src={recipe.image} className="w-12 h-12 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                          <span className="font-medium">{recipe.title}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentView === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">{categories.find(c => c.id === selectedCategory)?.title}</h2>
                <span className="text-stone-400 font-medium">{filteredRecipes.length} מתכונים</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecipes.map((recipe) => (
                  <motion.button
                    key={recipe.id}
                    layoutId={recipe.id}
                    onClick={() => handleRecipeSelect(recipe)}
                    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow text-right group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                      <div className="flex items-center gap-4 text-stone-400 text-sm">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 30 דק׳</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> קל להכנה</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'recipe' && selectedRecipe && (
            <motion.div
              key="recipe"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl"
            >
              <div className="relative h-80">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 right-8 text-white">
                  <span className="bg-emerald-500 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block">
                    {categories.find(c => c.id === selectedRecipe.category)?.title}
                  </span>
                  <h2 className="text-4xl font-bold">{selectedRecipe.title}</h2>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-12">
                {/* Stats */}
                <div className="flex flex-wrap gap-8 border-b border-stone-100 pb-8">
                  <div className="space-y-1">
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">זמן הכנה</p>
                    <p className="font-bold flex items-center gap-2 text-lg"><Clock className="w-5 h-5 text-emerald-600" /> 45 דק׳</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">מנות</p>
                    <p className="font-bold flex items-center gap-2 text-lg"><Users className="w-5 h-5 text-emerald-600" /> 4-6 סועדים</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">דרגת קושי</p>
                    <p className="font-bold flex items-center gap-2 text-lg"><ChefHat className="w-5 h-5 text-emerald-600" /> בינוני</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Ingredients */}
                  <div className="md:col-span-1 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Utensils className="w-6 h-6 text-emerald-600" />
                      מרכיבים
                    </h3>
                    
                    {selectedRecipe.ingredients && (
                      <ul className="space-y-3">
                        {selectedRecipe.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-stone-600">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {selectedRecipe.sections && selectedRecipe.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        <h4 className="font-bold text-emerald-700 border-b border-emerald-100 pb-1">{section.title}</h4>
                        <ul className="space-y-3">
                          {section.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-3 text-stone-600">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {selectedRecipe.notes && (
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                        <p className="text-emerald-800 text-sm leading-relaxed">
                          <strong>הערה:</strong> {selectedRecipe.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="md:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-emerald-600" />
                      אופן ההכנה
                    </h3>
                    <div className="space-y-8">
                      {selectedRecipe.instructions.map((step, idx) => (
                        <div key={idx} className="flex gap-6">
                          <div className="flex-none">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-400">
                              {idx + 1}
                            </div>
                          </div>
                          <div className="pt-2">
                            <p className="text-stone-700 leading-relaxed text-lg">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-stone-200 py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center gap-2 items-center text-emerald-600">
            <ChefHat className="w-6 h-6" />
            <span className="font-bold text-xl">המתכונים של אמא (עליזה)</span>
          </div>
          <p className="text-stone-400 text-sm">© 2026 כל הזכויות שמורות. בתיאבון!</p>
        </div>
      </footer>
    </div>
  );
}

