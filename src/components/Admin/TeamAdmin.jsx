import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, UserCheck, Phone, Mail, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function TeamAdmin() {
  const { ownerAndTeam, updateOwner, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const { owner, team } = ownerAndTeam;

  const [ownerEditOpen, setOwnerEditOpen] = useState(false);
  const [ownerFormData, setOwnerFormData] = useState(owner);

  const emptyMember = {
    name: '',
    designation: '',
    experience: '৫ বছর',
    specialty: '',
    phone: '01712-000000',
    image: ''
  };

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [memberFormData, setMemberFormData] = useState(emptyMember);

  const handleSaveOwner = (e) => {
    e.preventDefault();
    updateOwner(ownerFormData);
    setOwnerEditOpen(false);
  };

  const handleOpenAddMember = () => {
    setEditingMemberId(null);
    setMemberFormData(emptyMember);
    setMemberModalOpen(true);
  };

  const handleOpenEditMember = (member) => {
    setEditingMemberId(member.id);
    setMemberFormData(member);
    setMemberModalOpen(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!memberFormData.image) {
      memberFormData.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(memberFormData.name)}&background=F5A623&color=000&bold=true`;
    }

    if (editingMemberId) {
      updateTeamMember(editingMemberId, memberFormData);
    } else {
      addTeamMember(memberFormData);
    }
    setMemberModalOpen(false);
  };

  return (
    <div className="space-y-8 font-bengali">
      
      {/* 1. Proprietor & Founder Section */}
      <div className="bg-[#141414] border-2 border-[#F5A623]/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center">
              <UserCheck size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">প্রতিষ্ঠাতা ও স্বত্বাধিকারীর বিবরণ</h3>
              <p className="text-xs text-gray-400">মালিকের প্রোফাইল ও যোগাযোগের নম্বর এডিট করুন</p>
            </div>
          </div>

          <button
            onClick={() => {
              setOwnerFormData(owner);
              setOwnerEditOpen(true);
            }}
            className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
          >
            <Edit2 size={14} />
            <span>মালিকের তথ্য এডিট করুন</span>
          </button>
        </div>

        <div className="bg-[#0E0E0E] p-4 sm:p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 flex justify-center">
            <img
              src={owner.image}
              alt={owner.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#F5A623]"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(owner.name)}&background=F5A623&color=000&bold=true`;
              }}
            />
          </div>

          <div className="md:col-span-9 space-y-2 text-xs sm:text-sm text-gray-300">
            <h4 className="text-lg font-bold text-white font-heading">{owner.name}</h4>
            <p className="text-[#F5A623] font-semibold">{owner.title} ({owner.role})</p>
            <p><strong className="text-white">মোবাইল:</strong> {owner.phone} | <strong className="text-white">ইমেইল:</strong> {owner.email}</p>
            <p className="italic text-gray-400 border-l-2 border-[#F5A623] pl-3 py-1">"{owner.message}"</p>
          </div>
        </div>
      </div>

      {/* 2. Team Members & Staff List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-white/10 p-5 rounded-2xl">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">কর্মচারী ও সার্ভিস টিম সদস্যগণ</h3>
            <p className="text-xs text-gray-400">মোট সার্ভিস টিম সদস্য: {team.length} জন</p>
          </div>

          <button
            onClick={handleOpenAddMember}
            className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F5A623]/20"
          >
            <Plus size={16} />
            <span>নতুন টিম মেম্বার যোগ করুন</span>
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#F5A623]/30 transition-all shadow-lg text-center"
            >
              <div className="space-y-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#F5A623]"
                />

                <div>
                  <h4 className="text-base font-bold text-white font-heading">{member.name}</h4>
                  <p className="text-xs font-semibold text-[#F5A623] mt-0.5">{member.designation}</p>
                  <p className="text-[11px] text-gray-400 mt-1 font-medium">মোবাইল: {member.phone}</p>
                </div>

                <div className="bg-[#0E0E0E] p-2.5 rounded-xl border border-white/5 text-xs text-gray-300">
                  {member.specialty}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleOpenEditMember(member)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs py-2 rounded-lg border border-white/10 flex items-center justify-center gap-1 transition-colors"
                >
                  <Edit2 size={13} className="text-[#F5A623]" />
                  <span>এডিট</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`আপনি কি "${member.name}" কে মুছে ফেলতে চান?`)) {
                      deleteTeamMember(member.id);
                    }
                  }}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-2 rounded-lg border border-rose-500/20 transition-colors"
                  title="মুছে ফেলুন"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Owner Modal */}
      {ownerEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#141414] border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-heading">মালিকের তথ্য আপডেট করুন</h3>
              <button onClick={() => setOwnerEditOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveOwner} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">স্বত্বাধিকারীর নাম *</label>
                <input
                  type="text"
                  required
                  value={ownerFormData.name}
                  onChange={(e) => setOwnerFormData({ ...ownerFormData, name: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">ফোন নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={ownerFormData.phone}
                  onChange={(e) => setOwnerFormData({ ...ownerFormData, phone: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={ownerFormData.email}
                  onChange={(e) => setOwnerFormData({ ...ownerFormData, email: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">প্রতিষ্ঠাতার বার্তা / উক্তি</label>
                <textarea
                  rows={3}
                  value={ownerFormData.message}
                  onChange={(e) => setOwnerFormData({ ...ownerFormData, message: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOwnerEditOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-5 py-2.5 rounded-full"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-6 py-2.5 rounded-full shadow-md shadow-[#F5A623]/20"
                >
                  সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Team Member Modal */}
      {memberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#141414] border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-heading">
                {editingMemberId ? 'টিম সদস্য তথ্য এডিট' : 'নতুন টিম সদস্য যুক্ত করুন'}
              </h3>
              <button onClick={() => setMemberModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">কর্মচারীর নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ইঞ্জিনিয়ার মোঃ রফিকুল ইসলাম"
                  value={memberFormData.name}
                  onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">পদবী *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: চীফ মেকানিক্যাল ইঞ্জিনিয়ার"
                  value={memberFormData.designation}
                  onChange={(e) => setMemberFormData({ ...memberFormData, designation: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">ফোন নম্বর (যোগাযোগের জন্য) *</label>
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 01712-345679"
                  value={memberFormData.phone}
                  onChange={(e) => setMemberFormData({ ...memberFormData, phone: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">বিশেষজ্ঞতা / কাজের বিবরণ</label>
                <input
                  type="text"
                  placeholder="যেমন: হেভি জেনারেটর ওভারহোলিং ও মেরামত"
                  value={memberFormData.specialty}
                  onChange={(e) => setMemberFormData({ ...memberFormData, specialty: e.target.value })}
                  className="w-full bg-[#0E0E0E] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMemberModalOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-5 py-2.5 rounded-full"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-[#F5A623] hover:bg-[#FFB627] text-black font-extrabold text-xs px-6 py-2.5 rounded-full shadow-md shadow-[#F5A623]/20"
                >
                  {editingMemberId ? 'সেভ করুন' : 'যুক্ত করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
