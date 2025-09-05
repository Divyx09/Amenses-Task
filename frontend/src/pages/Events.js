import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Users, Plus, X, Vote,
  Clock, MapPin, User, ChevronRight
} from 'lucide-react';
import { eventsAPI, pollsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventPolls, setEventPolls] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPollForm, setShowPollForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: ''
  });

  const [pollFormData, setPollFormData] = useState({
    question: '',
    options: ['', '']
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      fetchEventPolls(selectedEvent._id);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const fetchEventPolls = async (eventId) => {
    try {
      const response = await pollsAPI.getByEvent(eventId);
      setEventPolls(response.data);
    } catch (err) {
      console.error('Failed to fetch event polls:', err);
      setEventPolls([]);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await eventsAPI.create(newEvent);
      setNewEvent({ title: '', description: '', date: '', location: '', category: '' });
      setShowCreateForm(false);
      fetchEvents();
    } catch (err) {
      setError('Failed to create event');
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      await eventsAPI.join(eventId);
      fetchEvents();
    } catch (err) {
      setError('Failed to join event');
    }
  };

  const handleCreatePoll = async () => {
    if (!pollFormData.question.trim() || pollFormData.options.filter(opt => opt.trim()).length < 2) {
      return;
    }

    try {
      const pollData = {
        question: pollFormData.question,
        options: pollFormData.options.filter(opt => opt.trim()).map(text => ({ text })),
        eventId: selectedEvent._id
      };
      
      await pollsAPI.create(pollData);
      setPollFormData({ question: '', options: ['', ''] });
      setShowPollForm(false);
      fetchEventPolls(selectedEvent._id);
    } catch (err) {
      setError('Failed to create poll');
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      await pollsAPI.vote(pollId, optionIndex);
      fetchEventPolls(selectedEvent._id);
    } catch (err) {
      setError('Failed to vote');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
            <p className="text-gray-600">Discover and join amazing events</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Create Event</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Create Event Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter event title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select category</option>
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="conference">Conference</option>
                      <option value="networking">Networking</option>
                      <option value="social">Social</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your event..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div 
              key={event._id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  {event.category && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  )}
                </div>
                
                {event.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                )}
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  {event.date && (
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      {event.location}
                    </div>
                  )}
                  <div className="flex items-center">
                    <User size={14} className="mr-2" />
                    {event.createdBy?.name || 'Unknown'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>View Details</span>
                    <ChevronRight size={16} />
                  </button>
                  
                  {event.createdBy?._id !== user?.id && 
                   !event.participants?.some(p => p._id === user?.id) && (
                    <button 
                      onClick={() => handleJoinEvent(event._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Join Event
                    </button>
                  )}
                  
                  {event.participants?.some(p => p._id === user?.id) && (
                    <span className="text-green-600 font-medium text-sm flex items-center space-x-1">
                      <span>✓ Joined</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">Be the first to create an amazing event!</p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Create First Event
            </button>
          </motion.div>
        )}

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div 
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6">
                  {/* Event Details */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Event Information</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          {selectedEvent.date && (
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2" />
                              {new Date(selectedEvent.date).toLocaleDateString()}
                            </div>
                          )}
                          {selectedEvent.location && (
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-2" />
                              {selectedEvent.location}
                            </div>
                          )}
                          <div className="flex items-center">
                            <User size={16} className="mr-2" />
                            Organized by {selectedEvent.createdBy?.name || 'Unknown'}
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="mr-2" />
                            {selectedEvent.participants?.length || 0} participants
                          </div>
                        </div>
                      </div>
                      
                      {selectedEvent.description && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {selectedEvent.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Participants */}
                    {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">Participants</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedEvent.participants.map((participant) => (
                            <span 
                              key={participant._id} 
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              {participant.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Polls Section */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                        <Vote size={20} />
                        <span>Event Polls</span>
                      </h4>
                      
                      {(selectedEvent.createdBy?._id === user?.id || selectedEvent.participants?.some(p => p._id === user?.id)) && (
                        <button 
                          onClick={() => setShowPollForm(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors duration-200"
                        >
                          <Plus size={16} />
                          <span>Create Poll</span>
                        </button>
                      )}
                    </div>

                    {/* Poll Creation Form */}
                    <AnimatePresence>
                      {showPollForm && (
                        <motion.div 
                          className="bg-gray-50 border rounded-lg p-4 mb-6"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <h5 className="font-medium text-gray-900 mb-4">Create New Poll</h5>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Poll Question
                              </label>
                              <input
                                type="text"
                                value={pollFormData.question}
                                onChange={(e) => setPollFormData(prev => ({ ...prev, question: e.target.value }))}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="What would you like to ask?"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Options
                              </label>
                              <div className="space-y-2">
                                {pollFormData.options.map((option, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...pollFormData.options];
                                        newOptions[index] = e.target.value;
                                        setPollFormData(prev => ({ ...prev, options: newOptions }));
                                      }}
                                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder={`Option ${index + 1}`}
                                    />
                                    {pollFormData.options.length > 2 && (
                                      <button
                                        onClick={() => {
                                          const newOptions = pollFormData.options.filter((_, i) => i !== index);
                                          setPollFormData(prev => ({ ...prev, options: newOptions }));
                                        }}
                                        className="text-red-600 hover:text-red-800 p-1"
                                      >
                                        <X size={16} />
                                      </button>
                                    )}
                                  </div>
                                ))}
                                {pollFormData.options.length < 6 && (
                                  <button
                                    onClick={() => setPollFormData(prev => ({ ...prev, options: [...prev.options, ''] }))}
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                                  >
                                    <Plus size={16} />
                                    <span>Add Option</span>
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                              <button 
                                onClick={() => {
                                  setShowPollForm(false);
                                  setPollFormData({ question: '', options: ['', ''] });
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={handleCreatePoll}
                                disabled={!pollFormData.question.trim() || pollFormData.options.filter(opt => opt.trim()).length < 2}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                              >
                                Create Poll
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Polls Display */}
                    <div className="space-y-4">
                      {eventPolls.length > 0 ? (
                        eventPolls.map((poll) => (
                          <div key={poll._id} className="bg-white border rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-3">{poll.question}</h5>
                            <div className="space-y-2">
                              {poll.options.map((option, index) => {
                                const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes.length, 0);
                                const percentage = totalVotes > 0 ? (option.votes.length / totalVotes) * 100 : 0;
                                const hasUserVoted = option.votes.some(vote => vote.toString() === user?.id);
                                const canVote = selectedEvent.participants?.some(p => p._id === user?.id) || selectedEvent.createdBy?._id === user?.id;
                                
                                return (
                                  <button
                                    key={index}
                                    onClick={() => canVote && handleVote(poll._id, index)}
                                    disabled={!canVote}
                                    className={`w-full text-left p-3 border rounded-md transition-all duration-200 ${
                                      hasUserVoted 
                                        ? 'border-green-500 bg-green-50' 
                                        : canVote 
                                          ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer' 
                                          : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    }`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="flex items-center space-x-2">
                                        {hasUserVoted && <span className="text-green-600">✓</span>}
                                        <span>{option.text}</span>
                                      </span>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                          <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                            style={{ width: `${percentage}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-sm text-gray-500">{option.votes.length}</span>
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                            <div className="mt-3 text-sm text-gray-500">
                              Total votes: {poll.options.reduce((sum, opt) => sum + opt.votes.length, 0)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <Vote size={48} className="mx-auto mb-2 opacity-50" />
                          <p>No polls yet. Create one to engage participants!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;
